import mongoose from "mongoose";

const Trivy = mongoose.Schema({
  SchemaVersion: {
    type: Number,
    required: false,
  },
  CreatedAt: {
    type: String,
    required: false,
  },
  ArtifactName: {
    type: String,
    required: false,
  },
  ArtifactType: {
    type: string,
    required: false,
  },
  Metadata: {
    type: {
      OS: {
        type: {
          Family: {
            type: String,
            require: false,
          },
          Name: {
            type: String,
            require: false,
          },
        },
        require: false,
        _id: false,
      },
      ImageID: {
        type: String,
        require: false,
      },
      DiffIDs: [
        {
          type: String,
          require: false,
        },
      ],
      RepoTags: [
        {
          type: String,
          require: false,
        },
      ],
      RepoDigests: [
        {
          type: String,
          require: false,
        },
      ],
      ImageConfig: {
        type: {
          architecture: {
            type: String,
            require: false,
          },
          created: {
            type: String,
            require: false,
          },
          history: [
            {
              type: {
                created: {
                  type: String,
                  require: false,
                },
                created_by: {
                  type: String,
                  require: false,
                },
                empty_layer: {
                  type: Boolean,
                  require: false,
                },
              },
              require: false,
              _id: false,
            },
          ],
          os: {
            type: String,
            require: false,
          },
          rootfs: {
            type: {
              type: {
                type: String,
                require: false,
              },
              diff_ids: [
                {
                  type: String,
                  require: false,
                },
              ],
            },
            require: false,
            _id: false,
          },
          config: {
            type: {
              Cmd: [
                {
                  type: String,
                  require: false,
                },
              ],
              Entrypoint: [
                {
                  type: String,
                  require: false,
                },
              ],
              Env: [
                {
                  type: String,
                  require: false,
                },
              ],
              WorkingDir: {
                type: String,
                require: false,
              },
              ArgsEscaped: {
                type: Boolean,
                require: false,
              },
            },
            require: false,
            _id: false,
          },
        },
        require: false,
        _id: false,
      },
    },
    required: false,
  },
  Results: [
    {
      type: {
        Target: {
          type: String,
          require: false,
        },
        Class: {
          type: String,
          require: false,
        },
        Type: {
          type: String,
          require: false,
        },
        Vulnerabilities: [
          {
            type: {
              VulnerabilityID: {
                type: String,
                require: false,
              },
              PkgID: {
                type: String,
                require: false,
              },
              PkgName: {
                type: String,
                require: false,
              },
              PkgPath:  {
                type: String,
                require: false,
              },
              InstalledVersion: {
                type: String,
                require: false,
              },
              FixedVersion: {
                type: String,
                require: false,
              },
              Status: {
                type: String,
                require: false,
              },
              Layer: {
                type: {
                  Digest: {
                    type: String,
                    require: false,
                  },
                  DiffID: {
                    type: String,
                    require: false,
                  },
                },
                require: false,
                _id: false,
              },
              SeveritySource: {
                type: String,
                require: false,
              },
              PrimaryURL: {
                type: String,
                require: false,
              },
              DataSource: {
                type: {
                  ID: {
                    type: String,
                    require: false,
                  },
                  Name: {
                    type: String,
                    require: false,
                  },
                  URL: {
                    type: String,
                    require: false,
                  },
                },
                require: false,
                _id: false,
              },
              Title: {
                type: String,
                require: false,
              },
              Description: {
                type: String,
                require: false,
              },
              Severity: {
                type: String,
                require: false,
              },
              CweIDs: [{
                type: String,
                require: false,
              }],
              CVSS: {
                type: {
                  nvd: {
                    type: {
                      V3Vector: {
                        type: String,
                        require: false,
                      },
                      V3Score: {
                        type: String,
                        require: false,
                      },
                    },
                    require: false,
                    _id: false,
                  },
                  redhat: {
                    type: {
                      V3Vector: {
                        type: String,
                        require: false,
                      },
                      V3Score: {
                        type: String,
                        require: false,
                      },
                    },
                    require: false,
                    _id: false,
                  },
                  ghsa: {
                    type: {
                      V3Vector: {
                        type: String,
                        require: false,
                      },
                      V3Score: {
                        type: String,
                        require: false,
                      },
                    },
                    require: false,
                    _id: false,
                  },
                },

                require: false,
                _id: false,
              },
              References: [
                {
                  type: String,
                  require: false,
                },
              ],
              PublishedDate: {
                type: String,
                require: false,
              },
              LastModifiedDate: {
                type: String,
                require: false,
              },
            },
            require: false,
            _id: false,
          },
        ],
      },
      required: false,
      _id: false,
    },
  ],
});

export default mongoose.model("Trivys", Trivy);
