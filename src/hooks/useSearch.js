import { useEffect, useId, useState } from "react";

export function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(false);
  const isFirstInput = useId(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("La búsqueda no puede estar vacía");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(false);
  }, [search, isFirstInput]);

  return { search, updateSearch, error };
}