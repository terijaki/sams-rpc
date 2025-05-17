---
name: Test Failure Report
title: "Monthly Test Failure - ${{ format(github.event.timestamp, 'YYYY-MM-DD') }}"
labels: ["bug", "test-failure"]
assignees: []
---

## ⚠️ Monthly Tests Failed

The automated monthly test check has detected failures in the test suite.

### Details

- **Date**: {{ date | date('YYYY-MM-DD HH:mm:ss Z') }}
- **Workflow Run**: [View workflow run]({{ env.WORKFLOW_URL }})

### Next Steps

1. Review the workflow logs linked above for detailed error information
2. Fix the failing tests
3. Run the tests locally to confirm fixes: `bun run test`
4. Commit and push your changes

This issue was automatically created by the monthly test check workflow.