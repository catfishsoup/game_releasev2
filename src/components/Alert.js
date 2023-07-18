import styled from "styled-components";

const PositiveAlert = styled.p`
  background-color: #90ee90;
  color: #03c03c;
  display: flex;
  position: absolute;
  opacity: 1;
  top: 2%;
  z-index: 5;
  padding: 1rem;
  width: fit-content;
  border-radius: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  transition: 0.3s ease-in;

  p {
    padding-top: 0.5em;
    margin-left: 0.5em
  }
`;
const FalseAlert = styled.p`
  background-color: #999999;
  color: white;
  position: absolute;
  top: 2%;
  z-index: 2;
  padding: 1rem;
  width: fit-content;
  border-radius: 5px;
  left: 50%;
  transform: translate(-50%, 0);
`;


export const GeneralPositiveAlert = ({ text }) => {
  return (
    <PositiveAlert>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="#6db36d"
          d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z"
        />
        <path
          fill="none"
          d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585L14 21.591z"
        />
      </svg>
      <p>{text}</p>
    </PositiveAlert>
  );
};
export const FailedAlert = ({ text }) => {
  return <FalseAlert>{text}</FalseAlert>;
};
export const ListAlert = ({ text }) => {
  return (
    <PositiveAlert>
      List '{text}' created successfully! The page will be refresh shortly.
    </PositiveAlert>
  );
};
