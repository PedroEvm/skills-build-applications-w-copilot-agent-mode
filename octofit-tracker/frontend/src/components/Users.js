import SharedResourceView from './SharedResourceView';

function Users() {
  console.log('Users component ready.');

  return (
    <SharedResourceView
      displayFields={['username', 'name', 'email']}
      resourcePath="users"
      title="Users"
    />
  );
}

export default Users;
