import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do shold be longer");
    }
    console.log("Submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={toDo}
          onChange={onChange}
          type="text"
          placeholder="Write a to do"
        />
        <button>Add</button>
        {toDoError}
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", { required: "First Name is required" })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "Last Name is required" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", {
            required: "Username is required",
            minLength: 10,
          })}
          placeholder="username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 5, message: "Your password is too short" },
          })}
          placeholder="password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: { value: 5, message: "your password is too short" },
          })}
          placeholder="password"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
