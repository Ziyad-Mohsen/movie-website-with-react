import { useEffect } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { useCharactersStore } from "../../../../store/characters/useCharacterStore";
import { image_base_url } from "../../../../lib/api";
import Avatar from "../../../../components/ui/Avatar/Avatar";

function CharactersSection() {
  const characters = useCharactersStore((state) => state.characters);
  const { getCharacters } = useCharactersStore();

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  return (
    <section className="py-section">
      <div className="container">
        <SectionTitle title="Characters" />
        <div className="flex items-start gap-5 overflow-x-scroll scrollbar-hide">
          {characters?.map((character) => {
            return (
              <div
                key={character.id}
                className="flex flex-col gap-2 items-center"
              >
                <Avatar
                  src={image_base_url + character.profile_path}
                  alt={"Character " + character.name}
                  size="xl"
                />
                <p className="text-center">{character.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CharactersSection;
