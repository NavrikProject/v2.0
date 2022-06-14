import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    courses: [],
    quantity: 0,
    total: 0,
  },

  reducers: {
    addCourse: (state, action) => {
      const itemIndex = state.courses.findIndex(
        (item) => item.course_id === action.payload.course_id
      );
      if (itemIndex >= 0) {
        state.courses[itemIndex].courseQuantity = 1;
        state.quantity = 1;
        toast.info("You can only add one course at one time", {
          position: "top-center",
        });
      } else {
        const tempCourses = { ...action.payload, courseQuantity: 1 };
        state.courses.push(tempCourses);
        state.quantity += 1;
        toast.success("Course added successfully to the cart", {
          position: "top-center",
        });
        // state.total += tempCourses.price;
      }
    },
    removeCourse: (state, action) => {
      const newCourses = state.courses.filter(
        (course) => course.course_id !== action.payload.course_id
      );
      state.courses = newCourses;
      state.quantity -= 1;
      toast.warn("Course Removed successfully from the cart", {
        position: "top-center",
      });
    },
    clearCart: (state, action) => {
      state.courses = [];
      state.quantity = 0;
      state.total = 0;
      toast.warning("All Courses Removed successfully from the cart", {
        position: "top-center",
      });
    },
  },
});

export const { addCourse, removeCourse, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
