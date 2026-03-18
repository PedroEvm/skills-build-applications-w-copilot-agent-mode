import SharedResourceView from './SharedResourceView';

function Activities() {
  console.log('Activities component ready.');

  return (
    <SharedResourceView
      displayFields={['name', 'title', 'type']}
      resourcePath="activities"
      title="Activities"
    />
  );
}

export default Activities;
