import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ChannelsList from "./ChannelsList.jsx";
import ChannelChat from "./ChannelChat.jsx";

export default function ChatWindow() {
  return (
    <Row className="d-flex align-items-center justify-content-center h-100 rounded shadow">
      <Col sm={2}>
        <ChannelsList/>
      </Col>
      <Col sm={10}>
        <ChannelChat/>
      </Col>
    </Row>
  );
}
