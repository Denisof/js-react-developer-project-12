import {useGetChannelsQuery} from "../../slices/channelsApi.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {setOpenChannel} from "../../slices/openChannel.js";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import AddChannel from "./AddChannel.jsx";
import RenameChannel from "./RenameChannel.jsx";
import RemoveChanel from "./RemoveChannel.jsx";
import {setRenamingChannel} from "../../slices/renamingChannel.js";
import {setRemovingChannel} from "../../slices/removingChannel.js";
import {setCreatingChannel} from "../../slices/creatingChannel.js";
import { io } from "socket.io-client";
import { _ } from 'lodash';
import { useTranslation } from 'react-i18next';
import {selectChannels} from "../../selectors/channels.js";

const getChannelTitle = (channel) => {
  return "# " + channel.name.substring(0, 12) + (channel.name.length > 12 ? "..." : "");
}

export default function ChannelsList() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {isLoading: channelsIsLoading, refetch: channelsRefetch} =
    useGetChannelsQuery();
  const channelsData = useSelector(selectChannels);

  const openChannel = useSelector(state => state.openChannel.value);
  const creatingChannel = useSelector(state => state.creatingChannel.value);

  useEffect(() => {
    if (openChannel === null && channelsData && channelsData.length > 0) {
      dispatch(setOpenChannel(channelsData[0]));
      return;
    }
    if (channelsData && channelsData.length > 0 && creatingChannel) {
      const channel = _.find(channelsData, {id: creatingChannel});
      if (channel) {
        dispatch(setOpenChannel(channel));
        dispatch(setCreatingChannel(null));
      }
    }
  }, [channelsData, openChannel, creatingChannel]);

  const openChannelRef = useRef(null);

  useEffect(() => {
    openChannelRef.current = openChannel;
  }, [openChannel]);

  useEffect(() => {
    const socketInstance = io();
    socketInstance.on('newChannel', async (channel) => {
       await channelsRefetch();
    });
    socketInstance.on('removeChannel', async ({id}) => {
      await channelsRefetch();
    });
    socketInstance.on('renameChannel', async (channel) => {
      await channelsRefetch();
    });
    socketInstance.on('renameChannel',  (channel) => {
      if (openChannelRef.current && openChannelRef.current.id === channel.id) {
        dispatch(setOpenChannel(channel));
      }
    });
    return () => {
      socketInstance.disconnect();
    }
  }, []);

  const getRenameChannelHandler = (channelId) => {
    return () => {
      dispatch(setRenamingChannel(channelId));
    }
  };
  const getRemoveChannelHandler = (channelId) => {
    return () => {
      dispatch(setRemovingChannel(channelId));
    }
  };
  return !channelsIsLoading &&  (
    <Navbar bg="light" data-bs-theme="light">
      <Container className="flex-column vh-100 me-auto">
        <div className="d-flex w-100 justify-content-between">
          <Navbar.Brand href="/">{t('chat.channels.channels')}</Navbar.Brand>
        <AddChannel />
        </div>
        <Nav className="flex-column vh-100 me-auto">
          {channelsData.map(channel => {
            const variant = (openChannel && openChannel.id === channel.id) ? "secondary" : "light";
            const removable = channel.removable;

            if (!removable) {
              return (
                <Nav.Item key={channel.id} className="d-flex justify-content-between">
                  <Button  as={ButtonGroup} className="w-100"size="sm" variant={variant} title={getChannelTitle(channel)} onClick={() => dispatch(setOpenChannel(channel))}>
                    {getChannelTitle(channel)}
                  </Button>
                </Nav.Item>
              );
            } else {
              return (
                <Nav.Item key={channel.id} className="d-flex justify-content-between">
                  <Button  as={ButtonGroup} size="sm" className="w-100" variant={variant} title={getChannelTitle(channel)} onClick={() => dispatch(setOpenChannel(channel))}>
                    {getChannelTitle(channel)}
                  </Button>
                  <DropdownButton
                    as={ButtonGroup}
                    size="sm"
                    variant={variant}
                    key={channel.id}
                  >
                    <Dropdown.Item onClick={getRemoveChannelHandler(channel.id)} eventKey="1">{t('chat.channels.action_remove')}</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={getRenameChannelHandler(channel.id)}>{t('chat.channels.action_rename')}</Dropdown.Item>
                  </DropdownButton>
                </Nav.Item>

              );
            }
          })}
        </Nav>
        <RemoveChanel />
        <RenameChannel />
      </Container>
    </Navbar>
  );
}
