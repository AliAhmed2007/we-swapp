-- Create trigger function to automatically log transaction impacts when a listing is completed
CREATE OR REPLACE FUNCTION public.log_transaction_impact()
RETURNS TRIGGER AS $$
DECLARE
  v_category_weight numeric(6,2);
  v_category_value numeric(10,2);
BEGIN
  -- Only log when status changes to COMPLETED
  IF NEW.status = 'COMPLETED' AND (OLD.status IS NULL OR OLD.status != 'COMPLETED') THEN
    -- Fetch category defaults
    SELECT avg_weight_kg, avg_value_usd
    INTO v_category_weight, v_category_value
    FROM public.categories
    WHERE id = NEW.category_id;
    
    -- Insert impact log
    INSERT INTO public.transaction_impact_logs (
      listing_id,
      seller_id,
      category_id,
      transaction_type,
      waste_diverted_kg,
      money_saved_estimated,
      completed_at
    ) VALUES (
      NEW.id,
      NEW.user_id,
      NEW.category_id,
      NEW.listing_type,
      COALESCE(v_category_weight, 1.00),
      CASE 
        WHEN NEW.listing_type = 'DONATE' THEN COALESCE(v_category_value, 15.00)
        WHEN NEW.listing_type = 'SELL' THEN COALESCE(NEW.price, 0.00)
        WHEN NEW.listing_type = 'SWAP' THEN COALESCE(v_category_value, 15.00)
        ELSE 0.00
      END,
      NOW()
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on listings table
DROP TRIGGER IF EXISTS trigger_log_transaction_impact ON public.listings;

CREATE TRIGGER trigger_log_transaction_impact
  AFTER UPDATE OF status ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.log_transaction_impact();

-- Add comment
COMMENT ON FUNCTION public.log_transaction_impact() IS 'Automatically logs sustainability impact when a listing status changes to COMPLETED';
