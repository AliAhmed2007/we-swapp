import { CreateListingForm } from '@/features/listings/components/create-listing-form';

export default function CreateListingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">List an Item</h1>
        <p className="text-muted-foreground">
          Share what you no longer need with your campus community
        </p>
      </div>

      <CreateListingForm />
    </div>
  );
}
