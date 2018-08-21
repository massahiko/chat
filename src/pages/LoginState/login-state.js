import React from "react";
import Loading from "../../shared/components/loading";
import { userService } from "../../services/user-service";

export default class LoginState extends React.Component {
    static navigationOptions = {
        header: null,
    }

    render() {
        userService.getUser().then(user => {
            if (user) {
                this.props.navigation.navigate("ChatStack")
            } else {
                this.props.navigation.navigate("LoginScreen");
            }
        });

        return (
            < Loading loading={true} />
        );
    }
}
