interface NavProps {
  navigation: {
    reset: (arg0: { index: number; routes: { name: string }[] }) => void;
    setOptions: (options: object) => void; // Add setOptions property
    navigate: (name: string, params?: object) => void; // Add navigate property
  };
}

export default NavProps;

