import ChatWindow from "./chat/ChatWindow.jsx";
import Container from 'react-bootstrap/Container';


export default function Home() {
  return (
    <Container className={"h-100"}>
      <ChatWindow/>
    </Container>
  );
}
