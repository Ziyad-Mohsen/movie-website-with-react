import { useState } from "react";
import Accordion from "../../../../components/ui/Accordion/Accordion";
import { Sections } from "../../../../constants/enums";

const faqData = [
  {
    id: crypto.randomUUID(),
    question: "What is this website about?",
    answer:
      "This website provides detailed information about movies, TV shows, and actors.",
    active: false,
  },
  {
    id: crypto.randomUUID(),
    question: "Where do you get the movie data from?",
    answer:
      "We use The Movie Database (TMDB) API to fetch accurate and up-to-date movie and TV show data.",
    active: false,
  },
  {
    id: crypto.randomUUID(),
    question: "Do I need to create an account to use the site?",
    answer:
      "No, you can browse movies and TV shows without an account. However, creating an account lets you save favorites and create watchlists.",
    active: false,
  },
  {
    id: crypto.randomUUID(),
    question: "Can I watch movies directly on this website?",
    answer:
      "No, we only provide information and trailers. We do not host or stream full movies.",
    active: false,
  },
  {
    id: crypto.randomUUID(),
    question: "Is this service free to use?",
    answer: "Yes, our website is completely free to browse and use.",
    active: false,
  },
  {
    id: crypto.randomUUID(),
    question: "How often is the movie data updated?",
    answer:
      "We update our data in real-time using TMDB's API, so it stays current with the latest releases.",
    active: false,
  },
  {
    id: crypto.randomUUID(),
    question: "Can I rate or review movies on your site?",
    answer:
      "Currently, we don't support user ratings or reviews, but you can see ratings from TMDB.",
    active: false,
  },
  {
    id: crypto.randomUUID(),
    question: "Why don’t I see some older or less popular movies?",
    answer:
      "If a movie isn’t listed, it may not be available on TMDB or lacks enough data.",
    active: false,
  },
  {
    id: crypto.randomUUID(),
    question: "Do you have a mobile app?",
    answer:
      "Not at the moment, but our website is fully responsive and works well on mobile browsers.",
    active: false,
  },
  {
    id: crypto.randomUUID(),
    question: "How can I suggest a new feature or report a bug?",
    answer:
      "You can contact us through our feedback form or email us at support@[yourdomain].com.",
    active: false,
  },
];
type faqQuestion = {
  id: string;
  question: string;
  answer: string;
  active: boolean;
};

function FaqSection() {
  const [faq, setFaq] = useState<faqQuestion[]>(faqData);

  const handleToggle = (clickedQuestion: faqQuestion) => {
    if (!clickedQuestion.active) {
      setFaq(
        faq.map((q) => {
          if (q.id === clickedQuestion.id) {
            return { ...q, active: true };
          } else {
            return { ...q, active: false };
          }
        })
      );
    } else {
      setFaq(
        faq.map((q) => {
          return { ...q, active: false };
        })
      );
    }
  };

  return (
    <section className="py-section container" id={Sections.FAQ}>
      <h3 className="text-center mb-5 title-2-bold">FAQs</h3>
      <div className="flex flex-col gap-5 items-center">
        {faq.map((q, i) => {
          return (
            <Accordion
              show={q.active}
              key={i}
              question={q.question}
              answer={q.answer}
              handleToggle={() => handleToggle(q)}
            />
          );
        })}
      </div>
    </section>
  );
}

export default FaqSection;
