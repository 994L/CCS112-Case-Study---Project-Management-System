import Login from "./pages/Login";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import { createContext, useContext, useReducer, useState } from "react";
import { DISPATCH_METHOD } from "./DispatchMethods";
import axios from "axios";
import ProjectDetails from "./pages/ProjectDetails";

const AuthContext = createContext();
const ProjectContext = createContext();

function App() {
  /**
   *
   * MAKING REDUCER
   *
   */
  const start_state = {
    loading: false,
    user_data: {},
  };

  function reducer_function(state, action) {
    switch (action.type) {
      case DISPATCH_METHOD.START_LOADING:
        return {
          ...state,
          loading: true,
        };
      case DISPATCH_METHOD.FINISH_LOADING:
        return {
          ...state,
          loading: false,
        };
      case DISPATCH_METHOD.SUCCESS_AUTHORIZATION:
        return {
          ...state,
          user_data: action.payload.data,
        };

      case DISPATCH_METHOD.FAIL_AUTHORIZATION:
        return {
          ...state,
          user_data: {},
        };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer_function, start_state);

  /**
   *
   *END OF MAKING REDUCER
   *
   */

  //--------------------------------------\\

  /**
   *
   *  MAKING METHODS FOR AUTH CONTEXT
   *
   */

  async function login(email, password) {
    dispatch({ type: DISPATCH_METHOD.START_LOADING });
    try {
      const validate = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      if (validate.status === 200) {
        dispatch({
          type: DISPATCH_METHOD.SUCCESS_AUTHORIZATION,
          payload: { data: validate.data.user },
        });
        sessionStorage.setItem("token", validate.data.token);
        return;
      }
      dispatch({ type: DISPATCH_METHOD.FAIL_AUTHORIZATION });
    } catch (error) {
      dispatch({ type: DISPATCH_METHOD.FAIL_AUTHORIZATION });
    } finally {
      dispatch({ type: DISPATCH_METHOD.FINISH_LOADING });
    }
  }

  async function logout() {
    dispatch({ type: DISPATCH_METHOD.START_LOADING });
    try {
      const validate = await axios.post(
        "http://127.0.0.1:8000/api/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (validate.status === 200) {
        dispatch({
          type: DISPATCH_METHOD.FAIL_AUTHORIZATION,
        });
        sessionStorage.removeItem("token");
        return;
      }
      dispatch({ type: DISPATCH_METHOD.FAIL_AUTHORIZATION });
    } catch (error) {
      dispatch({ type: DISPATCH_METHOD.FAIL_AUTHORIZATION });
    } finally {
      dispatch({ type: DISPATCH_METHOD.FINISH_LOADING });
    }
  }

  /**
   *
   * END OF MAKING METHODS FOR AUTH CONTEXT
   *
   */

  /**
   *
   *  MAKING METHODS FOR PROJECT CONTEXT
   *
   */
  const [loading, setLoading] = useState(false);
  async function getAllProjects() {
    setLoading(true);
    try {
      const validate = await axios.get("http://127.0.0.1:8000/api/projects/", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (validate.status === 200) {
        return { success: true, data: validate.data.projects };
      }

      return { success: false, data: [] };
    } catch (error) {
      console.log(error);
      return { success: false, data: [] };
    } finally {
      setLoading(false);
    }
  }

  async function insertProject(title, description) {
    setLoading(true);
    try {
      const validate = await axios.post(
        "http://127.0.0.1:8000/api/projects/",
        { title, description, status: "On going" },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (validate.status === 201) {
        return { success: true, data: validate.data.created_project };
      }

      return { success: false, data: {} };
    } catch (error) {
      console.log(error);
      return { success: false, data: {} };
    } finally {
      setLoading(false);
    }
  }

  async function getSingleProject(id) {
    setLoading(true);
    try {
      const validate = await axios.get(
        `http://127.0.0.1:8000/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (validate.status === 200) {
        console.log(validate.data);

        return { success: true, data: validate.data.searched_project };
      }

      return { success: false, data: {} };
    } catch (error) {
      console.log(error);
      return { success: false, data: {} };
    } finally {
      setLoading(false);
    }
  }

  async function getProjectTasks(id) {
    setLoading(true);
    try {
      const validate = await axios.get(
        `http://127.0.0.1:8000/api/projects/${id}/tasks`,

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (validate.status === 200) {
        return { success: true, data: validate.data.tasks };
      }

      return { success: false, data: {} };
    } catch (error) {
      console.log(error);
      return { success: false, data: {} };
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id) {
    setLoading(true);
    try {
      const validate = await axios.put(
        `http://127.0.0.1:8000/api/projects/${id}`,
        {
          status: "Finished",
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (validate.status === 200) {
        return { success: true, data: validate.data.msg };
      }

      return { success: false, data: {} };
    } catch (error) {
      console.log(error);
      return { success: false, data: {} };
    } finally {
      setLoading(false);
    }
  }

  async function updateProject(id, title, description) {
    setLoading(true);
    try {
      const validate = await axios.put(
        `http://127.0.0.1:8000/api/projects/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (validate.status === 200) {
        return { success: true, data: validate.data.msg };
      }

      return { success: false, data: {} };
    } catch (error) {
      console.log(error);
      return { success: false, data: {} };
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id) {
    setLoading(true);
    try {
      const validate = await axios.delete(
        `http://127.0.0.1:8000/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (validate.status === 200) {
        return { success: true, data: validate.data.msg };
      }

      return { success: false, data: {} };
    } catch (error) {
      console.log(error);
      return { success: false, data: {} };
    } finally {
      setLoading(false);
    }
  }

  async function addTask(title, project_id) {
    setLoading(true);
    try {
      const validate = await axios.post(
        `http://127.0.0.1:8000/api/tasks`,
        {
          title,
          project_id,
          status: "On going",
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (validate.status === 201) {
        return { success: true, data: validate.data.created_task };
      }

      return { success: false, data: {} };
    } catch (error) {
      console.log(error);
      return { success: false, data: {} };
    } finally {
      setLoading(false);
    }
  }

  async function updateTaskStatus(id) {
    setLoading(true);
    try {
      const validate = await axios.put(
        `http://127.0.0.1:8000/api/tasks/${id}`,
        {
          status: "Finished",
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (validate.status === 200) {
        return { success: true, data: validate.data.msg };
      }

      return { success: false, data: {} };
    } catch (error) {
      console.log(error);
      return { success: false, data: {} };
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#18230F]">
      <AuthContext.Provider
        value={{
          loading: state.loading,
          user_data: state.user_data,
          login,
          logout,
        }}
      >
        <ProjectContext.Provider
          value={{
            getAllProjects,
            insertProject,
            getSingleProject,
            getProjectTasks,
            updateStatus,
            updateProject,
            deleteProject,
            addTask,
            updateTaskStatus,
            loading,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/projects/:id" element={<ProjectDetails />}></Route>
            </Routes>
          </BrowserRouter>
        </ProjectContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

export const UseAuth = () => {
  return useContext(AuthContext);
};

export const UseProject = () => {
  return useContext(ProjectContext);
};
