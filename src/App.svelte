<script>
  	import { fade, fly } from 'svelte/transition';

    const defaultOrg = "dotnet";
    const defaultAzdoOrg = "dnceng";

    const repos = {
        ".NET Docker": [
            { name: "dotnet-docker" },
            { name: "docker-tools" },
            { name: "dotnet-framework-docker", org: "microsoft" },
            { name: "dotnet-buildtools-prereqs-docker" },
            { name: "dotnet-docker-internal", noPipelines: true, noInternal: true },
            { name: "release" }
        ],
        ".NET Source Build": [
            { name: "installer" },
            { name: "source-build" },
            { name: "source-build-reference-packages" },
        ],
    };

    const publicRepo = repo =>
        `https://github.com/${repo.org ?? defaultOrg}/${repo.name}`;

    const pulls = repo => publicRepo(repo) + "/pulls";
    const issues = repo => publicRepo(repo) + "/issues";

    const internalRepo = repo =>
        `https://dev.azure.com/${ repo.azdoOrg ?? defaultAzdoOrg }/internal/_git/${(repo.org ?? "dotnet") + "-" + repo.name}`;

    const pipelines = (repo, isPublic) =>
        `https://dev.azure.com/${defaultAzdoOrg}${ isPublic ? "-public/public/" : "/" }internal/_build?definitionScope=%5C${repo.org ?? defaultOrg}%5C${repo.name}`;

    let currentTab = 0;
    let currentProject = Object.keys(repos)[currentTab]
    $: currentProject = Object.keys(repos)[currentTab]
</script>

<section class="section">
  <div class="container">
    <div class="tabs is-boxed">
      <ul>
        {#each Object.keys(repos) as project, i}
          <li class="{currentProject === project ? 'is-active' : ''}">
            <a on:click={() => currentTab = i}>{project}</a>
          </li>
        {/each}
      </ul>
    </div>
    {#each Object.keys(repos) as project, index (project)}
      {#if currentProject === project}
        <div class="columns is-multiline" in:fly={{ x: 100, duration: 200 }} out:fade={{ duration: 0 }}>
          {#each repos[project] as repo}
            <div class="column is-4">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <h3 class="title is-4">{repo.name}</h3>
                    <ul>
                      <li><a href={publicRepo(repo)}>Public Repo</a></li>
                      <li><a href={pulls(repo)}>Pulls</a></li>
                      <li><a href={issues(repo)}>Issues</a></li>
                      {#if !repo.noInternal}
                        <li><a href={internalRepo(repo)}>Internal Repo</a></li>
                      {/if}
                      {#if !repo.noPipelines}
                        <li><a href={pipelines(repo, true)}>Public Pipelines</a></li>
                        <li><a href={pipelines(repo, false)}>Internal Pipelines</a></li>
                      {/if}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
</section>
