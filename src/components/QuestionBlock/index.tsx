interface QuestionBlockProps {
  heading: string;
  note?: string;
  children: React.ReactNode;
}

function QuestionBlock({ children, heading, note }: QuestionBlockProps) {
  return (
    <div className="question-block">
      <b>{heading}</b>
      <br />
      {note ? <i>&gt;&gt; {note}</i> : null}
      <br />
      {children}
      <hr />
    </div>
  );
}

export default QuestionBlock;
