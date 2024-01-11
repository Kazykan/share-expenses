import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const checkUser = async (username) => {
  const response = await axios.get(`/api/checkUser?username=${username}`);
  return response.data;
};

const createUser = async (username) => {
  const response = await axios.post('/api/createUser', { username });
  return response.data;
};

const YourComponent = ({ username }) => {
  // Проверка существования пользователя
  const { data: userData, status: userStatus } = useQuery(['checkUser', username], () => checkUser(username), {
    enabled: !!username, // Выполнять запрос только если есть имя пользователя
  });

  // Создание пользователя
  const createUserMutation = useMutation((newUsername) => createUser(newUsername));

  const handleCheckAndCreateUser = async () => {
    if (userStatus === 'success' && !userData) {
      // Пользователь не существует, создаем его
      try {
        await createUserMutation.mutateAsync(username);
        console.log('Пользователь успешно создан');
      } catch (error) {
        console.error('Ошибка при создании пользователя', error);
      }
    } else {
      console.log('Пользователь уже существует');
    }
  };

  // Вызываем функцию при монтировании компонента
  useEffect(() => {
    handleCheckAndCreateUser();
  }, [userData, userStatus]);

  return <div>Your Component Content</div>;
};

export default YourComponent;