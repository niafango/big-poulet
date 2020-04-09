import {Message} from "discord.js";
import i18n from "i18n";
import ICommand from "../interfaces/ICommand";

const help: ICommand = {
    name: "agrougrou",
    aliases: ["ahouuu", "wofe"],
    description: i18n.__("commands.agrougrou.description"),
    usage: "",

    cooldown: 1,
    isGuildOnly: false,
    hasArgs: false,
    minimumArgsNb: 0,
    hasParameters: false,

    execute(message: Message): void {
        const data: string[] = [
            `\`#############################################################`,
            `###################################################    ######`,
            `###############################################   /~\   ######`,
            `############################################   _-  ~~~', ####`,
            `##########################################  _-~       )  ####`,
            `#######################################  _-~          |  ####`,
            `####################################  _-~            ;  #####`,
            `##########################  __---___-~              |   #####`,
            `#######################   _~   ,,                  ;   ,,  ##`,
            `#####################  _-~    ;'                  |  ,'  ; ##`,
            `###################  _~      '                     ~'   ; ###`,
            `############   __---;                                 ,' ####`,
            `########   __~~  ___                                ,' ######`,
            `#####  _-~~   -~~ _            agrougrou          ,' ########`,
            `#####  -_         _                              ; ##########`,
            `#######  ~~----~~~   ;                          ; ###########`,
            `#########  /          ;                        ; ############`,
            `#######  /             ;                      ; #############`,
            `#####  /                                     ; ##############`,
            `###  /                                      ; ###############`,
            `#                                            ################\``,
        ];
        message.channel.send(data);
    },
};

module.exports = help;