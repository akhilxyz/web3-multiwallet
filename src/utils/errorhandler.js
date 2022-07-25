export const web3ErrorHandle = async (err) => {
  let message = "Transaction Reverted!";
  if (err.message.indexOf("Rejected") > -1) {
    message = "User denied the transaction!";
  } else if (err.message && err.message.indexOf("User denied") > -1) {
    message = "User denied the transaction!";
  } else if (err.message && err.message.indexOf("INSUFFICIENT_B") > -1) {
    message = "Insufficient value of second token!";
  } else if (err.message && err.message.indexOf("INSUFFICIENT_A") > -1) {
    message = "Insufficient value of first token!";
  } else {
    console.log(err, err.message);
  }
  return message;
};

export const metaMaskError = (error) => {
  const errorCode = error && error.code ? error.code : 0
  if (errorCode === 0) {
    return error
  } else if (errorCode === -32700) {
    return "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.";
  } else if (errorCode === -32600) {
    return "The JSON sent is not a valid Request object.";
  } else if (errorCode === -32601) {
    return "The method does not exist / is not available.";
  } else if (errorCode === -32602) {
    return "Invalid method parameter(s).";
  } else if (errorCode === -32603) {
    return "Internal JSON-RPC error.";
  } else if (errorCode === -32000) {
    return "Invalid input.";
  } else if (errorCode === "-32001") {
    return "Resource not found.";
  } else if (errorCode === -32002) {
    return "Request is already pending !";
  } else if (errorCode === -32003) {
    return "Transaction rejected.";
  } else if (errorCode === -32004) {
    return "Method not supported.";
  } else if (errorCode === -32005) {
    return "Request limit exceeded.";
  } else if (errorCode === 4001) {
    return "User rejected the request.";
  } else if (errorCode === 4100) {
    return "The requested account and/or method has not been authorized by the user.";
  } else if (errorCode === 4200) {
    return "The requested method is not supported by this Ethereum provider.";
  } else if (errorCode === 4900) {
    return "The provider is disconnected from all chains.";
  } else if (errorCode === 4901) {
    return "The provider is disconnected from the specified chain.";
  } else {
    // do something...
  }
};

export const getRPCErrorMessage = (err) => {
  var open = err?.stack?.indexOf("{");
  var close = err?.stack?.lastIndexOf("}");
  var j_s = err?.stack?.substring(open, close + 1);
  var reason = JSON.parse(j_s);
  return reason;
};
