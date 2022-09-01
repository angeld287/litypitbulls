// @ts-nocheck
/**
 * Define App Locals & Configs
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

class Locals {

    /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */
    public static config(): any {
        const server_host = window._env_.REACT_APP_SERVER_HOST;
        const server_port = window._env_.REACT_APP_SERVER_PORT;

        const server_url = "http://" + server_host + ":" + server_port

        return {
            server_url
        }
    }
}

export default Locals;