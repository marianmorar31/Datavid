export const getDaysUntilBirthday = (birthDate) => {
  const now = new Date();
  const birthdayThisYear = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  const birthdayNextYear = new Date(
    now.getFullYear() + 1,
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (birthdayThisYear < now) {
    return Math.ceil((birthdayNextYear - now) / (1000 * 60 * 60 * 24));
  } else {
    return Math.ceil((birthdayThisYear - now) / (1000 * 60 * 60 * 24));
  }
};
