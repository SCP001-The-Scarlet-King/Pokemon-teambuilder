document.addEventListener('DOMContentLoaded', function() {
    const teamList = document.getElementById('team-list');
    const buildNewTeamButton = document.getElementById('build-new-team');

    teams.forEach(team => {
        const li = document.createElement('li');
        li.textContent = team.name;
        li.addEventListener('click', () => {
            window.location.href = `/teambuilder/edit-team/${team.id}/`;
        });
        teamList.appendChild(li);
    });

    buildNewTeamButton.addEventListener('click', () => {
        window.location.href = "/teambuilder/edit-team/";
    });
});