import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState, useContext, useRef } from "react";
import { globalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user";
const userServ = new UserService();
export default function Main() {
  const { userIdentity, user } = useContext(globalContext);
  const navigate = useNavigate();
  const [listItem, setListItem] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [list, setList] = useState({
    list_heading: "",
    item: [""],
  });
  const [showDeleteList, setShowDeleteList] = useState({
    toggle: false,
    index: "",
  });
  const [addListItem, setAddListItem] = useState({ toggle: false, index: "" });
  const [listItemValue, setListItemValue] = useState("");
  const [removeTaskItem, setRemoveTaskItem] = useState({
    toggle: false,
    item_id: "",
  });
  let item_id = useRef(0);
  let task_id = useRef(0);
  useEffect(() => {
    if (!userIdentity) {
      navigate("/login");
    }
  }, []);
  const fetchData = async () => {
    const id = JSON.parse(window.localStorage.getItem("user"))?.id;
    if (id) {
      const result = await userServ.listAll(id);
      setListItem(result.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const id = JSON.parse(window.localStorage.getItem("user"))?.id;
    const result = await userServ.addList({ ...list, user_id: id });
    if (result.err) {
      window.alert(result.message);
    } else {
      window.alert(result.message);
      setToggle(!toggle);
      setList({ list_heading: "", item: [""] });
      fetchData();
    }
  }
  function addItem() {
    const newArray = [...list.item];
    newArray.push("");
    const newList = { ...list, item: newArray };
    setList(newList);
  }
  function removeItem(index) {
    if (index === 0) {
      return;
    }
    const newArray = list.item.filter((data, i) => {
      return index !== i;
    });
    const newList = { list_heading: list.list_heading, item: newArray };
    setList(newList);
  }
  function handleItemChange(e, index) {
    const newArray = [...list.item];
    newArray[index] = e.target.value;
    const newList = { list_heading: list.list_heading, item: newArray };
    setList(newList);
  }
  function handleStartDrag(event, list_id, itemId) {
    event.preventDefault();
    item_id.current = itemId;
  }
  async function handleDrag(e, list_id) {
    e.preventDefault();
    task_id.current = list_id;
  }
  async function handleDragEnd() {
    const result = await userServ.changeListId({
      item_id: item_id.current,
      list_id: task_id.current,
    });
    if (result) {
      fetchData();
    }
  }
  async function handleDeleteItem(e, item_id) {
    if (e.target.checked) {
      setRemoveTaskItem((prev) => {
        return {
          toggle: !prev.toggle,
          item_id: item_id,
        };
      });
    }
  }
  async function deleteTaskItem(value) {
    if (value) {
      const item_id = removeTaskItem.item_id;
      const result = await userServ.deleteItem({ item_id: item_id });
      if (result) {
        setRemoveTaskItem((prev) => {
          return {
            toggle: !prev.toggle,
            item_id: "",
          };
        });
        setTimeout(() => {
          fetchData();
        }, 500);
      }
    } else {
      setTimeout(() => {
        setRemoveTaskItem((prev) => {
          return {
            toggle: !prev.toggle,
            item_id: "",
          };
        });
      }, 500);
    }
  }
  function handleAddListItem(i) {
    const newObj = { toggle: !addListItem.toggle, index: i };
    setAddListItem(newObj);
  }
  async function handleSubmitListItem(e, list_id) {
    e.preventDefault();
    const object = {
      task_list_id: list_id,
      item: listItemValue,
    };
    const result = await userServ.addListItem(object);
    if (result) {
      setAddListItem({ toggle: false, index: "" });
      setListItemValue("");
      fetchData();
    } else {
      window.alert(result?.err);
    }
  }
  async function deleteList(listId) {
    const result = await userServ.deleteList(listId);
    if (result) {
      setShowDeleteList((prev) => {
        return {
          toggle: !prev.toggle,
          index: "",
        };
      });
      fetchData();
    } else {
      window.alert(result?.err);
    }
  }
  return (
    <div
      // style={toggle ? { backgroundColor: "darkslategrey", zIndex: "10" } : {}}
      className="sptb"
    >
      <div className="containers mx-3 ">
        <div
          className="mt-4 ms-5 d-flex scroll-x"
        >
          <div className="d-flex">
            <div className="task-create-box">
              <p className="task-heading">CREATE NEW LIST</p>
              <div className="text-center mt-4">
                <AddCircleOutlineRoundedIcon
                  type="button"
                  sx={{ fontSize: "50px" }}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="d-flex">
            {listItem?.map((list, i) => {
              return (
                <div
                  className="task-box"
                  onDragOver={(e) => {
                    handleDrag(e, list.id);
                  }}
                  onDragEnd={() => {
                    handleDragEnd();
                  }}
                >
                  <div
                    className="row ms-0 me-0"
                    style={{ backgroundColor: "#d9d9d9" }}
                  >
                    <div className="col-11 ">
                      <p className="task-heading">
                        {list.list_heading.charAt(0).toUpperCase() +
                          list.list_heading.slice(1)}
                      </p>
                    </div>
                    <span
                      className="col-1 m-0 p-0"
                      style={{ position: "relative" }}
                    >
                      <MoreVertIcon
                        onClick={() => {
                          setShowDeleteList((prev) => {
                            return { toggle: !prev.toggle, index: i };
                          });
                        }}
                      />
                      {showDeleteList.toggle && showDeleteList.index === i ? (
                        <button
                          className="btn btn-sm btn-danger delete-list"
                          onClick={() => {
                            deleteList(list.id);
                          }}
                        >
                          Delete List
                        </button>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  {list?.task_items?.map((i) => {
                    return (
                      <div
                        className="list-item"
                        draggable
                        onDragCapture={(e) => {
                          handleStartDrag(e, list.id, i.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          className="item-checkbox"
                          onChange={(e) => {
                            handleDeleteItem(e, i.id);
                          }}
                        />
                        <p className="p-item">{i.item}</p>
                      </div>
                    );
                  })}
                  {addListItem.index === i && addListItem.toggle ? (
                    ""
                  ) : (
                    <button
                      onClick={() => {
                        handleAddListItem(i);
                      }}
                      className="btn btn-sm btn-info me-2 ms-2 mt-2"
                    >
                      add item
                    </button>
                  )}
                  {addListItem.toggle && addListItem.index === i ? (
                    <div className="input-group">
                      <form
                        onSubmit={(e) => {
                          handleSubmitListItem(e, list.id);
                        }}
                      >
                        <input
                          value={listItemValue}
                          type="text"
                          onChange={(e) => {
                            setListItemValue(e.target.value);
                          }}
                          className="form-control ms-2 me-3 mt-3"
                          placeholder="ADD ITEM"
                        />
                        <button
                          type="submit"
                          className="btn ripple  btn-sm btn-secondary me-2 ms-2"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="btn ripple  btn-sm btn-warning me-2 ms-2"
                          onClick={() => {
                            setAddListItem({ toggle: false, index: "" });
                          }}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {removeTaskItem.toggle ? (
          <div className="modal d-block mt-5 pt-5" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">task completed !!!!</h5>
                </div>
                <div className="modal-body">
                  <button
                    className="btn btn-success m-2 p-3"
                    type="button"
                    onClick={() => {
                      deleteTaskItem(true);
                    }}
                  >
                    Yup
                  </button>
                  <button
                    className="btn btn-danger m-2 p-3"
                    type="button"
                    onClick={() => {
                      deleteTaskItem(false);
                    }}
                  >
                    Nope
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {toggle ? (
          <>
            <div
              className="modal  d-block mt-5 pt-5"
              tabIndex={-1}
              role="dialog"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">CREATE NEW LIST</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="input-group ">
                        <input
                          type="text"
                          className="form-control ms-2 me-3 mt-3"
                          placeholder="ENTER LIST HEADING"
                          value={list.list_heading}
                          onChange={(e) => {
                            setList((prev) => {
                              return {
                                ...prev,
                                list_heading: e.target.value,
                              };
                            });
                          }}
                        />
                      </div>
                      <h5 className="text-center mt-2">ITEM LIST</h5>
                      {list.item &&
                        list.item.map((data, index) => {
                          return (
                            <div className="input-group">
                              <input
                                value={data}
                                type="text"
                                onChange={(e) => {
                                  handleItemChange(e, index);
                                }}
                                className="form-control ms-2 me-3 mt-3"
                                placeholder="ENTER LIST ITEM"
                              />
                              <AddIcon
                                sx={{
                                  marginTop: "20px",
                                  marginRight: "8px",
                                  color: "blue",
                                }}
                                onClick={addItem}
                              />
                              <RemoveIcon
                                sx={{
                                  marginTop: "20px",
                                  marginRight: "8px",
                                  color: "blue",
                                }}
                                onClick={() => {
                                  removeItem(index);
                                }}
                              />
                            </div>
                          );
                        })}
                      <button className="btn btn-primary m-2 p-3" type="submit">
                        Create
                      </button>
                      <button
                        className="btn btn-secondary m-2 p-3"
                        type="button"
                        onClick={() => {
                          setToggle(!toggle);
                        }}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
