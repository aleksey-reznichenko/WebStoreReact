import {Link} from "@mui/material";
import * as React from "react";

const Social = ({Icon, link}) => {
    return (
        <Link
            className='Footer__Social'
            marginRight="30px"
            component="a"
            variant="body2"
            href={link}
            color="#969696"
            underline="none"
        >
            <Icon />
        </Link>
    )
}
export default Social
