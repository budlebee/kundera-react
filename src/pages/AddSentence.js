export const AddSentence = () => {
  return (
    <>
      <div>
        문장 추가하기. 여기서 문장추가하면 전체 문장풀에도 추가되지만, 자기
        자신의 피드에도 추가돼야 하겠지.
        <textarea placeholder="인상깊었던 문장, 마음에 갖고 있는 문장, 어딘가 띄워보내고 싶은 문장"></textarea>
        <input placeholder="어디서 나온 문장인가요? 몰라도 상관없어요."></input>
      </div>
    </>
  );
};
