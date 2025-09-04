type CollectionCardProps = {
  collection: string;
};

function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="px-8 py-3 flex items-center justify-center bg-secondary hover:bg-secondary-shade-2 transition-colors w-fit h-fit rounded-full cursor-pointer">
      {collection}
    </div>
  );
}

export default CollectionCard;
