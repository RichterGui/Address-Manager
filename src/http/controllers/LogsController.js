import ListLogsService from '../../services/ListLogsService.js';

export default class LogsController {
  constructor(repository) {
    this.logsRepository = repository;
  }

  async list(request, response) {
    try {
      const listLogs = new ListLogsService(this.logsRepository);
      const logs = await listLogs.execute();
      return response.status(200).json(logs);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}
