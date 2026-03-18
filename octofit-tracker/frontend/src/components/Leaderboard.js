import SharedResourceView from './SharedResourceView';

function Leaderboard() {
  console.log('Leaderboard component ready.');

  return (
    <SharedResourceView
      displayFields={['name', 'user', 'username', 'title']}
      resourcePath="leaderboard"
      title="Leaderboard"
    />
  );
}

export default Leaderboard;
