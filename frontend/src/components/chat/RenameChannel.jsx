import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setRenamingChannel } from '../../slices/renamingChannel.js';
import { useGetChannelsQuery } from '../../slices/channelsApi.js';
import ChannelModal from './channel/ChannelModal.jsx';

const RenameChannel = () => {
  const renamingChannelId = useSelector((state) => state.renamingChannel.value);
  const { t } = useTranslation();
  const { data: channelsData } = useGetChannelsQuery();
  const currentChannel = renamingChannelId && channelsData
    ? channelsData.find((channel) => channel.id === renamingChannelId) : null;

  const dispatch = useDispatch();
  const onCloseHandler = () => {
    dispatch(setRenamingChannel(null));
  };
  return currentChannel && (
    <ChannelModal
      modalTitle={t('chat.channels.action_rename')}
      channel={currentChannel}
      onSubmit={onCloseHandler}
      onClose={onCloseHandler}
    />
  );
};

export default RenameChannel;
