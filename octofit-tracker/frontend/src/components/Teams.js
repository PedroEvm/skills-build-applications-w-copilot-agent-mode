import SharedResourceView from './SharedResourceView';

function Teams() {
  console.log('Teams component ready.');

  return (
    <SharedResourceView
      displayFields={['name', 'team_name', 'title']}
      resourcePath="teams"
      title="Teams"
    />
  );
}

export default Teams;
