import Home from '../containers/Home';

export default function Index() {
  console.log(typeof window);
  if (typeof window !== "undefined") {

    if (!("Notification" in window)) {
      console.log('Esse browser não suporta notificações desktop');
    } else {
      console.log(Notification.permission);
      if (Notification.permission !== 'granted') {
        console.log('entrei');
        Notification.requestPermission();
      }
    }
  }

  return (
    <main>
      <Home />
    </main>
  );
}
