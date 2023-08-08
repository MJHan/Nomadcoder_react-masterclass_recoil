import { useRecoilValue, useSetRecoilState } from "recoil";
import { ITodo, categoriesState, toDoState } from "../atoms";
import { styled } from "styled-components";

const LiToDo = styled.li`
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.boxColor};
  font-size: 20px;
  overflow-wrap: break-word;
`;

const ButtonCategory = styled.button`
  border-radius: 5px;
  border-style: solid;
  border: 1px;
  margin: 10px 3px 3px 0px;
`;

function ToDo({ text, category, id }: ITodo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      if (name === "delete") {
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <LiToDo>
      <div>{text}</div>
      <div>
        <ButtonCategory
          style={{ color: "tomato", fontWeight: "bold" }}
          onClick={onClick}
          name="delete"
        >
          x
        </ButtonCategory>
        {categories.map((item) => (
          <ButtonCategory
            key={item}
            disabled={item === category}
            name={item}
            onClick={onClick}
          >
            {item}
          </ButtonCategory>
        ))}
      </div>
    </LiToDo>
  );
}

export default ToDo;
