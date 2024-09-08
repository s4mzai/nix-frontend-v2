import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";
import { combineDateAndTime, getLocalDateTime } from "@/utils/dateUtils";
import { useContext, useReducer } from "react";
import { toast } from "react-toastify";

interface NewEventState {
  title: string;
  description: string | null;
  allDay: boolean;
  startDate: string | null;
  startTime: string | null;
  addEndDateTime: boolean;
  endDate: string | null;
  endTime: string | null;
  society: string | null;
}

const initialState: NewEventState = {
  title: "",
  description: "",
  allDay: false,
  startDate: getLocalDateTime().slice(0, 10), //curr date time is default
  startTime: getLocalDateTime().slice(11, 16),
  addEndDateTime: false,
  endDate: getLocalDateTime().slice(0, 10),
  endTime: getLocalDateTime().slice(11, 16),
  society: null,
};

const enum ActionType {
  SetTitle,
  SetDescription,
  SetAllDay,
  SetStartDate,
  SetStartTime,
  SetAddEndDateTime,
  SetEndDate,
  SetEndTime,
  SetSociety,
}

export default function NewEvent() {
  const { setError } = useContext(ErrorContext);

  const reducer = (
    state: NewEventState,
    action: { type: ActionType; payload },
  ) => {
    const updatedData = { ...state };
    switch (action.type) {
      case ActionType.SetTitle:
        updatedData.title = action.payload;
        break;
      case ActionType.SetDescription:
        updatedData.description = action.payload;
        break;
      case ActionType.SetAllDay:
        updatedData.allDay = action.payload;
        break;
      case ActionType.SetStartDate:
        updatedData.startDate = action.payload;
        break;
      case ActionType.SetStartTime:
        updatedData.startTime = action.payload;
        break;
      case ActionType.SetAddEndDateTime:
        updatedData.addEndDateTime = action.payload;
        break;
      case ActionType.SetEndDate:
        updatedData.endDate = action.payload;
        break;
      case ActionType.SetEndTime:
        updatedData.endTime = action.payload;
        break;
      case ActionType.SetSociety:
        updatedData.society = action.payload;
        break;
      default:
        return updatedData;
    }
    return updatedData;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    title,
    description,
    allDay,
    startDate,
    startTime,
    addEndDateTime,
    endDate,
    endTime,
    society,
  } = state;

  const handleInput = (e, actionType: ActionType) => {
    dispatch({ type: actionType, payload: e.target.value });
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleAllDayChange = (e) => {
    dispatch({ type: ActionType.SetAllDay, payload: !allDay });

    if (state.allDay === true) {
      dispatch({ type: ActionType.SetEndTime, payload: null });
      dispatch({ type: ActionType.SetEndDate, payload: null });
    }
  };

  const handleAddEndDateTimeChange = () => {
    if (addEndDateTime) {
      dispatch({ type: ActionType.SetEndDate, payload: null });
      dispatch({ type: ActionType.SetEndTime, payload: null });
    }
    dispatch({ type: ActionType.SetAddEndDateTime, payload: !addEndDateTime });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !allDay || !startDate) {
      toast.error("Please fill out the required fields.");
      return;
    }

    const start = combineDateAndTime(state.startDate, state.startTime);
    const end = combineDateAndTime(state.endDate, state.endTime);

    const request = {
      title: title,
      description: description,
      allDay: allDay,
      start: start,
      end: end,
      society: society,
    };

    console.log(request);

    const endPoint = "/event/create-event";

    API.post(endPoint, request)
      .then(() => toast.success("Event added successfully"))
      .catch((e) => setError(e));
  };

  return (
    <form className="max-w-4xl mx-auto my-10 p-8 bg-white shadow rounded">
      {/*title*/}
      <h1>
        <textarea
          className="text-4xl w-full mb-4 overflow-y-hidden focus:outline-none leading-tight"
          id="title"
          placeholder="Give this event a title"
          autoFocus={true}
          value={title}
          onChange={(e) => handleInput(e, ActionType.SetTitle)}
          maxLength={75}
        />
        <div className="w-full font-medium text-sm flex flex-row-reverse">
          {title.length}/75
        </div>
      </h1>

      {/* description */}
      <div className="mb-6">
        <label className="block mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          id="description"
          placeholder="Add description"
          value={description}
          onChange={(e) => handleInput(e, ActionType.SetDescription)}
        />
      </div>

      {/*allDay*/}
      <div className="mb-6">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={allDay}
            className="sr-only peer"
            onChange={handleAllDayChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-md text-gray-900">All-Day Event?</span>
        </label>
      </div>

      {/* date and time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* start Date */}
        <div>
          <label className="block mb-2" htmlFor="start-date">
            Start Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            id="start-date"
            value={state.startDate}
            onChange={(e) => handleInput(e, ActionType.SetStartDate)}
          />
        </div>

        {/* start Time */}
        {!allDay && (
          <div>
            <label className="block mb-2" htmlFor="start-time">
              Start Time
            </label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              id="start-time"
              value={state.startTime}
              onChange={(e) => handleInput(e, ActionType.SetStartTime)}
            />
          </div>
        )}

        {!allDay && (
          <div className="mb-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={state.addEndDateTime}
                className="sr-only peer"
                onChange={handleAddEndDateTimeChange}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-md text-gray-900">
                Add End Timings ?
              </span>
            </label>
          </div>
        )}

        <div></div>

        {/* end Date */}
        {!allDay && addEndDateTime && (
          <div>
            <label className="block mb-2" htmlFor="end-date">
              End Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              id="end-date"
              value={state.endDate}
              onChange={(e) => handleInput(e, ActionType.SetEndDate)}
              min={state.startDate}
            />
          </div>
        )}

        {/* end Time */}
        {!allDay && addEndDateTime && (
          <div>
            <label className="block mb-2" htmlFor="end-time">
              End Time
            </label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              id="end-time"
              value={state.endTime}
              onChange={(e) => handleInput(e, ActionType.SetEndTime)}
              min={state.startTime}
            />
          </div>
        )}
      </div>

      {/* todo: add society input */}
      {/*todo: add ability to add multiple events at once */}

      <div className="flex space-x-4">
        <button
          className="bg-gray-200 text-black p-2 rounded hover:bg-indigo-500 hover:text-white"
          onClick={handleSubmit}
        >
          Save Event
        </button>
      </div>
    </form>
  );
}
