import PropTypes from "prop-types";
// @mui
import { Grid } from "@mui/material";
import ShopBLogCard from "./BlogPostCard";

// ----------------------------------------------------------------------

BLogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default function BLogList({ blogs, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {blogs?.map((blog) => (
        // <Grid key={blog?.id} item xs={4} sm={4} md={4} xl={8}>
					<ShopBLogCard key={blog?.id}  blog={blog}  />
        // </Grid>
      ))}
    </Grid>
  );
}
