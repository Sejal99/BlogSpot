import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Custom hook to manage token
const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return token;
};

// custom hook for navigation actions
const useNavigation = () => {
  const router = useRouter();

  const goTo = (path: string) => {
    router.push(path);
  };

  const logout = () => {
    localStorage.clear();
    goTo('/');
  };

  return { goTo, logout };
};

const Navbar = () => {
  const token = useToken();
  const { goTo, logout } = useNavigation();

  return (
    <div className="px-8 items-center bg-gradient-to-br from-pink-300 to-pink-500 justify-between flex gap-3 p-3 py-4">
      <div onClick={() => goTo('/')} className="cursor-pointer text-[1.8rem] hover:text-white font-semibold">
        Blogify
      </div>
      <div className="items-center flex gap-5">
        {!token ? (
          <div className="flex gap-5">
            <button onClick={() => goTo('/signup')} className="rounded-lg font-medium text-[1.2rem] hover:text-white">
              Sign up
            </button>
            <button onClick={() => goTo('/login')} className="rounded-lg font-medium text-[1.2rem] hover:text-white">
              Sign in
            </button>
          </div>
        ) : (
          <div className="flex gap-5">
            <button onClick={() => goTo('/all-blogs')} className="rounded-lg font-semibold text-[1.2rem] hover:text-white">
              All Blogs
            </button>
            <button onClick={() => goTo('/createBlog')} className="rounded-lg font-semibold text-[1.2rem] hover:text-white">
              Create Blog
            </button>
            <button onClick={() => goTo('/myBlogs')} className="rounded-lg font-semibold text-[1.2rem] hover:text-white">
              My Blogs
            </button>
            <button onClick={logout} className="rounded-lg font-semibold text-[1.2rem] hover:text-white">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
