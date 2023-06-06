export class UserType {
  static MANAGEMENT = "management";
  static STAFF = "staff";
  static STUDENT = "student";
}

export const getUserType = (queryType) => {
  switch (queryType) {
    case UserType.MANAGEMENT:
      return UserType.MANAGEMENT;
    case UserType.STAFF:
      return UserType.STAFF;
    case UserType.STUDENT:
      return UserType.STUDENT;
    default:
      return null;
  }
};
