import SharedResourceView from './SharedResourceView';

function Workouts() {
  console.log('Workouts component ready.');

  return (
    <SharedResourceView
      displayFields={['name', 'workout_name', 'title']}
      resourcePath="workouts"
      title="Workouts"
    />
  );
}

export default Workouts;
