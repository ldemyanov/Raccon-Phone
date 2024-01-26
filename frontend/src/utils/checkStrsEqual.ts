export const checkStrsEqual = (str1: string, str2: string): boolean => {
  const a = str1.toLocaleLowerCase() === str2.toLocaleLowerCase();
  console.log(a);
  return a;
}