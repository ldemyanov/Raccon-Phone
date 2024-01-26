import { getRoom } from '@src/api';
import useSocket from '@src/hooks/useSocket';
import { setPlayers, setRoomID, setSelfData } from '@src/redux/reducers/lobbyReducer';
import { RootState } from '@src/redux/store';
import { useAppSelector, useAppDispatch } from '@src/redux/store';
import { IPlayer } from '@src/types';
import { useNavigate } from 'react-router-dom';
import { routes } from '@src/routes';

export const useAnonymousLogin = (roomId: string) => {
  const { connect } = useSocket();
  const { name, icon } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [, LobbyPage] = routes;
  const navigate = useNavigate();

  const login = async () => {
    if (name) {
      // Need to do validation name

      const res = await getRoom(name, icon, roomId);

      dispatch(setPlayers(res.users));
      dispatch(setRoomID(res.roomId));

      const self = res.users.find((user) => user.name === name) as IPlayer;

      if (self) {
        dispatch(setSelfData(self));
        connect(res.roomId, self.userId);
        navigate(LobbyPage.path);
      } else {
        // Are Maybe to throw error?
      }
    }
  };

  return login;
};
