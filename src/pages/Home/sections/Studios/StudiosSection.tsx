import { useEffect, useState } from "react";
import type { Studio } from "../../../../types/globals";
import { axiosInstance } from "../../../../lib/axios";
import { image_base_url } from "../../../../lib/api";

async function getStudios() {
  try {
    const response = await axiosInstance.get(
      "/watch/providers/movie?language=en-US&watch_region=AE"
    );
    const data = await response.data;

    return data.results;
  } catch (error) {
    console.log(error);
  }
}

function StudiosSection() {
  const [studios, setStudios] = useState<null | Studio[]>(null);

  useEffect(() => {
    async function fetchStudios() {
      const data = await getStudios();
      setStudios(data);
    }
    fetchStudios();
  }, []);
  return (
    <section className="py-section container">
      <h3 className="text-center title-2-bold mb-5">Studios</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center w-full max-w-4xl mx-auto">
        {studios?.slice(0, 10).map((studio) => {
          return (
            <div
              className="rounded-xl overflow-hidden w-24"
              key={studio.provider_id}
            >
              <img
                className="w-full"
                src={image_base_url + studio.logo_path}
                alt={studio.provider_name}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StudiosSection;
