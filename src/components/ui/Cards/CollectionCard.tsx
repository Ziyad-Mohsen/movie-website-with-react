type CollectionCardProps = {
  collection: string;
};

function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="px-8 py-3 flex items-center justify-center bg-secondary w-fit rounded-full cursor-pointer">
      {collection}
    </div>
  );
}

export default CollectionCard;
