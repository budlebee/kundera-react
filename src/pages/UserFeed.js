import { SentenceCard } from "../components/SentenceCard";
import { testMySentences } from "../lib/test";

export const UserFeed = () => {
  return (
    <>
      <div>갈무리한 문장들을 모아볼 수 있는 피드.</div>
      {testMySentences.map((ele) => {
        return <SentenceCard>{ele.sentence}</SentenceCard>;
      })}
    </>
  );
};
