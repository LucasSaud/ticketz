import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import { i18n } from "../../translate/i18n";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import useSettings from "../../hooks/useSettings";
import { toast } from 'react-toastify';
import { makeStyles } from "@material-ui/core/styles";
import { grey, blue } from "@material-ui/core/colors";
import { Tabs, Tab } from "@material-ui/core";

//import 'react-toastify/dist/ReactToastify.css';
 
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 240,
  },
  tab: {
    borderRadius: 4,
    width: "100%",
    "& .MuiTab-wrapper": {
      color: "#128c7e"
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "center"
    }


  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
  },
  cardAvatar: {
    fontSize: "55px",
    color: grey[500],
    backgroundColor: "#ffffff",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardTitle: {
    fontSize: "18px",
    color: blue[700],
  },
  cardSubtitle: {
    color: grey[600],
    fontSize: "14px",
  },
  alignRight: {
    textAlign: "right",
  },
  fullWidth: {
    width: "100%",
  },
  selectContainer: {
    width: "100%",
    textAlign: "left",
  },
}));

export default function Options(props) {
  const { settings, scheduleTypeChanged } = props;
  const classes = useStyles();
  const [userRating, setUserRating] = useState("disabled");
  const [scheduleType, setScheduleType] = useState("disabled");
  const [callType, setCallType] = useState("enabled");
  const [chatbotType, setChatbotType] = useState("");
  const [CheckMsgIsGroup, setCheckMsgIsGroupType] = useState("enabled");

  const [loadingUserRating, setLoadingUserRating] = useState(false);
  const [loadingScheduleType, setLoadingScheduleType] = useState(false);
  const [loadingCallType, setLoadingCallType] = useState(false);
  const [loadingChatbotType, setLoadingChatbotType] = useState(false);
  const [loadingCheckMsgIsGroup, setCheckMsgIsGroup] = useState(false);

  const [smtpauthType, setUrlSmtpauthType] = useState("");
  const [loadingUrlSmtpauthType, setLoadingUrlSmtpauthType] = useState(false);
  const [usersmtpauthType, setUserSmtpauthType] = useState("");
  const [loadingSmtpauthType, setLoadingSmptauthType] = useState(false);
  const [clientsecretsmtpauthType, setClientSecrectSmtpauthType] = useState("");
  const [loadingClientSecrectSmtpauthType, setLoadingClientSecrectSmtpauthType] = useState(false);
  const [smtpPortType, setSmtpPortType] = useState("");
  const [loadingSmtpPortType, setLoadingSmtpPortType] = useState(false)  
  const { update } = useSettings();

  useEffect(() => {
    if (Array.isArray(settings) && settings.length) {
      const userRating = settings.find((s) => s.key === "userRating");
      if (userRating) {
        setUserRating(userRating.value);
      }
      const scheduleType = settings.find((s) => s.key === "scheduleType");
      if (scheduleType) {
        setScheduleType(scheduleType.value);
      }
      const callType = settings.find((s) => s.key === "call");
      if (callType) {
        setCallType(callType.value);
      }
      const CheckMsgIsGroup = settings.find((s) => s.key === "CheckMsgIsGroup");
      if (CheckMsgIsGroup) {
        setCheckMsgIsGroupType(CheckMsgIsGroup.value);
      }
      const chatbotType = settings.find((s) => s.key === "chatBotType");
      if (chatbotType) {
        setChatbotType(chatbotType.value);
      }
      const smtpauthType = settings.find((s) => s.key === "smtpauth");
      if (smtpauthType) {
        setUrlSmtpauthType(smtpauthType.value);
      }

      const usersmtpauthType = settings.find((s) => s.key === "usersmtpauth");
      if (usersmtpauthType) {
        setUserSmtpauthType(usersmtpauthType.value);
      }

      const clientsecretsmtpauthType = settings.find((s) => s.key === "clientsecretsmtpauth");
      if (clientsecretsmtpauthType) {
        setClientSecrectSmtpauthType(clientsecretsmtpauthType.value);
      }

      const smtpPortType = settings.find((s) => s.key === "smtpport");
      if (smtpPortType) {
        setSmtpPortType(smtpPortType.value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  async function handleChangeUserRating(value) {
    setUserRating(value);
    setLoadingUserRating(true);
    await update({
      key: "userRating",
      value,
    });
    toast.success("Operação atualizada com sucesso.");
    setLoadingUserRating(false);
  }

  async function handleScheduleType(value) {
    setScheduleType(value);
    setLoadingScheduleType(true);
    await update({
      key: "scheduleType",
      value,
    });
    //toast.success("Oraçãpeo atualizada com sucesso.");
    toast.success('Operação atualizada com sucesso.', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
      });
    setLoadingScheduleType(false);
    if (typeof scheduleTypeChanged === "function") {
      scheduleTypeChanged(value);
    }
  }

  async function handleCallType(value) {
    setCallType(value);
    setLoadingCallType(true);
    await update({
      key: "call",
      value,
    });
    toast.success("Operação atualizada com sucesso.");
    setLoadingCallType(false);
  }

  async function handleChatbotType(value) {
    setChatbotType(value);
    setLoadingChatbotType(true);
    await update({
      key: "chatBotType",
      value,
    });
    toast.success("Operação atualizada com sucesso.");
    setLoadingChatbotType(false);
  }

  async function handleGroupType(value) {
    setCheckMsgIsGroupType(value);
    setCheckMsgIsGroup(true);
    await update({
      key: "CheckMsgIsGroup",
      value,
    });
    toast.success("Operação atualizada com sucesso.");
    setCheckMsgIsGroup(false);
    /*     if (typeof scheduleTypeChanged === "function") {
          scheduleTypeChanged(value);
        } */
  }

  async function handleChangeUrlSmtpauth(value) {
    setUrlSmtpauthType(value);
    setLoadingUrlSmtpauthType(true);
    await update({
      key: "smtpauth",
      value,
    });
    toast.success("Operação atualizada com sucesso.");
    setLoadingUrlSmtpauthType(false);
  }

  async function handleChangeUserSmptauth(value) {
    setUserSmtpauthType(value);
    setLoadingSmptauthType(true);
    await update({
      key: "usersmtpauth",
      value,
    });
    toast.success("Operação atualizada com sucesso.");
    setLoadingSmptauthType(false);
  }

  async function handleChangeClientSecrectSmtpauth(value) {
    setClientSecrectSmtpauthType(value);
    setLoadingClientSecrectSmtpauthType(true);
    await update({
      key: "clientsecretsmtpauth",
      value,
    });
    toast.success("Operação atualizada com sucesso.");
    setLoadingClientSecrectSmtpauthType(false);
  }

  async function handleChangeSmtpPort(value) {
    setSmtpPortType(value);
    setLoadingSmtpPortType(true);
    await update({
      key: "smtpport",
      value,
    });
    toast.success("Operação atualizada com sucesso.");
    setLoadingSmtpPortType(false);
  }
  return (
    <>
      <Grid spacing={3} container>
        {/* <Grid xs={12} item>
                    <Title>Configurações Gerais</Title>
                </Grid> */}
        <Grid xs={12} sm={6} md={4} item>
          <FormControl className={classes.selectContainer}>
            <InputLabel id="ratings-label">Avaliações</InputLabel>
            <Select
              labelId="ratings-label"
              value={userRating}
              onChange={async (e) => {
                handleChangeUserRating(e.target.value);
              }}
            >
              <MenuItem value={"disabled"}>Desabilitadas</MenuItem>
              <MenuItem value={"enabled"}>Habilitadas</MenuItem>
            </Select>
            <FormHelperText>
              {loadingUserRating && "Atualizando..."}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FormControl className={classes.selectContainer}>
            <InputLabel id="schedule-type-label">
              Gerenciamento de Expediente
            </InputLabel>
            <Select
              labelId="schedule-type-label"
              value={scheduleType}
              onChange={async (e) => {
                handleScheduleType(e.target.value);
              }}
            >
              <MenuItem value={"disabled"}>Desabilitado</MenuItem>
              <MenuItem value={"queue"}>Gerenciamento Por Fila</MenuItem>
              <MenuItem value={"company"}>Gerenciamento Por Empresa</MenuItem>
            </Select>
            <FormHelperText>
              {loadingScheduleType && "Atualizando..."}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FormControl className={classes.selectContainer}>
            <InputLabel id="group-type-label">
              Ignorar Mensagens de Grupos
            </InputLabel>
            <Select
              labelId="group-type-label"
              value={CheckMsgIsGroup}
              onChange={async (e) => {
                handleGroupType(e.target.value);
              }}
            >
              <MenuItem value={"disabled"}>Desativado</MenuItem>
              <MenuItem value={"enabled"}>Ativado</MenuItem>
            </Select>
            <FormHelperText>
              {loadingScheduleType && "Atualizando..."}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FormControl className={classes.selectContainer}>
            <InputLabel id="call-type-label">
              Aceitar Chamada
            </InputLabel>
            <Select
              labelId="call-type-label"
              value={callType}
              onChange={async (e) => {
                handleCallType(e.target.value);
              }}
            >
              <MenuItem value={"disabled"}>Não Aceitar</MenuItem>
              <MenuItem value={"enabled"}>Aceitar</MenuItem>
            </Select>
            <FormHelperText>
              {loadingCallType && "Atualizando..."}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} md={4} item>
          <FormControl className={classes.selectContainer}>
            <InputLabel id="chatbot-type-label">
              Tipo Chatbot
            </InputLabel>
            <Select
              labelId="chatbot-type-label"
              value={chatbotType}
              onChange={async (e) => {
                handleChatbotType(e.target.value);
              }}
            >
              <MenuItem value={"text"}>Texto</MenuItem>
            </Select>
            <FormHelperText>
              {loadingChatbotType && "Atualizando..."}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>


      <Grid spacing={3} container>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="on"
          variant="scrollable"
          className={classes.tab}
          style={{
            marginBottom: 20,
            marginTop: 20
          }}
        >
          <Tab

            label={i18n.t("optionsPage.integra")} />

        </Tabs>

      </Grid>
      {/*-----------------SMTP-AUTH-----------------*/}
      <Grid spacing={3} container
        style={{ marginBottom: 10 }}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="on"
          variant="scrollable"
          className={classes.tab}
        >
          <Tab label="SMTP" />

        </Tabs>
        <Grid xs={12} sm={12} md={3} item>
          <FormControl className={classes.selectContainer}>
            <TextField
              id="smtpauth"
              name="smtpauth"
              margin="dense"
              label="Url SMTP"
              variant="outlined"
              value={smtpauthType}
              onChange={async (e) => {
                handleChangeUrlSmtpauth(e.target.value);
              }}
            >
            </TextField>
            <FormHelperText>
              {loadingUrlSmtpauthType && "Atualizando..."}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12} md={3} item>
          <FormControl className={classes.selectContainer}>
            <TextField
              id="usersmtpauth"
              name="usersmtpauth"
              margin="dense"
              label="User SMTP"
              variant="outlined"
              value={usersmtpauthType}
              onChange={async (e) => {
                handleChangeUserSmptauth(e.target.value);
              }}
            >
            </TextField>
            <FormHelperText>
              {loadingSmtpauthType && "Atualizando..."}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12} md={3} item>
          <FormControl className={classes.selectContainer}>
            <TextField
              id="clientsecretsmtpauth"
              name="clientsecretsmtpauth"
              margin="dense"
              label="Password SMTP"
              variant="outlined"
              value={clientsecretsmtpauthType}
              onChange={async (e) => {
                handleChangeClientSecrectSmtpauth(e.target.value);
              }}
            >
            </TextField>
            <FormHelperText>
              {loadingClientSecrectSmtpauthType && "Atualizando..."}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12} md={3} item>
          <FormControl className={classes.selectContainer}>
            <TextField
              id="smtpport"
              name="smtpport"
              margin="dense"
              label="Porta SMTP"
              variant="outlined"
              value={smtpPortType}
              onChange={async (e) => {
                handleChangeSmtpPort(e.target.value);
              }}
            >
            </TextField>
            <FormHelperText>
              {loadingSmtpPortType && "Atualizando..."}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
