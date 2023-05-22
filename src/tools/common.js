function ok(res, data) {
  return res.status(200).json({ status: true, data: data });
}
function error(res, message, code) {
  return res.status(code).json({ status: false, data: { message: message } });
}

export default {
  ok,
  error,
};
