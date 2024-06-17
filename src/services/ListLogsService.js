export default class ListLogsService {
  constructor(repository) {
    this.logsRepository = repository;
  }

  async execute() {
    const logs = await this.logsRepository.list();
    return logs;
  }
}
