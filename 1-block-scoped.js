export default function taskBlock(trueOrFalse) {
  let task = false;
  let task2 = true;

  if (trueOrFalse) {
    const taskTemporary = true;
    const task2Temporary = false;
  }

  return [task, task2];
}
