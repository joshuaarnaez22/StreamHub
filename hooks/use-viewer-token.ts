import { createViewerToken } from "@/actions/server-actions/token";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);
        const decodeToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const name = decodeToken?.name;
        const identity = decodeToken.jti;
        if (identity) setIdentity(identity);

        if (name) setName(name);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
