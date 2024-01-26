import { IPlayer } from '@src/types';

export const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:5000';

interface IRoom {
  roomId: string;
  typeGame: string;
  users: IPlayer[];
}

type GetRoom = (name: string, icon: string, roomId: string) => Promise<IRoom>;

export const getRoom: GetRoom = async (name, icon, roomId) => {
  const setRoomId = () => (roomId ? `&roomId=${roomId}` : '');

  const response = await fetch(`${API_URL}/room?name=${name}&icon=${icon}${setRoomId()}`);

  return await response.json();
};

type PostCanvas = (canvas: HTMLCanvasElement) => Promise<{ url: string }>; // это он возвращает промис с url давай
export const postCanvas: PostCanvas = async (canvas) => {
  const blob = await new Promise((resolve) => canvas.toBlob(resolve));
  const formData = new FormData();
  formData.append('image', blob as Blob);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  return await response.json();
};

export const getRoomPlayers = async (roomId: string) => {
  const response = await fetch(`${API_URL}/room/players?roomId=${roomId}`);

  return await response.json();
};
