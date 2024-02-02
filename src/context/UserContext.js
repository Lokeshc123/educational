import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  return (
    <UserType.Provider
      value={{
        userId,
        setUserId,
        role,
        setRole,
        selectedCourse,
        setSelectedCourse,
      }}
    >
      {children}
    </UserType.Provider>
  );
};

export { UserContext, UserType };
